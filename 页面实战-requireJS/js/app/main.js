requirejs.config({
  baseUrl:'js',
  paths: {
    jquery:'com/jquery.min'
  }
})
requirejs(['../app/index'])
