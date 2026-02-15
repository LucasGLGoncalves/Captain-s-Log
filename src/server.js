const express = require('express');
const app = express();
const models = require('./models/post');
const bodyParser = require('body-parser');
const promBundle = require('express-prom-bundle');
const config = require('./system-life');
const middlewares = require('./middleware');

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  promClient: {
    collectDefaultMetrics: {}
  }
});

app.use(middlewares.countRequests);
app.use(metricsMiddleware);
app.use(config.middlewares.healthMid);
app.use('/', config.routers);
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/post', (req, res) => {
  res.render('edit-entry', { post: { title: '', content: '', summary: '' }, valido: true });
});

app.post('/post', async (req, res) => {
  let valid = true;

  const titleOk = req.body.title?.length !== 0 && req.body.title.length <= 30;
  const summaryOk = req.body.resumo?.length !== 0 && req.body.resumo.length <= 50;
  const contentOk = req.body.description?.length !== 0 && req.body.description.length <= 2000;

  valid = Boolean(titleOk && summaryOk && contentOk);

  if (valid) {
    await models.Post.create({
      title: req.body.title,
      content: req.body.description,
      summary: req.body.resumo,
      publishDate: Date.now()
    });
    res.redirect('/');
  } else {
    res.render('edit-entry', {
      post: { title: req.body.title, content: req.body.description, summary: req.body.resumo },
      valido: false
    });
  }
});

app.post('/api/post', async (req, res) => {
  for (const item of req.body.artigos || []) {
    await models.Post.create({
      title: item.title,
      content: item.description,
      summary: item.resumo,
      publishDate: Date.now()
    });
  }

  res.json(req.body.artigos);
});

app.get('/post/:id', async (req, res) => {
  const post = await models.Post.findByPk(req.params.id);
  res.render('view-entry', { post: post });
});

app.get('/', async (req, res) => {
  const posts = await models.Post.findAll();
  res.render('index', { posts: posts });
});

models.initDatabase();
app.listen(8080);

console.log("Captain's Log rodando na porta 8080");
