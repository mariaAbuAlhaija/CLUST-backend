import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(()=>{
  Route.get('/', 'AnswersController.get')
  Route.get('/:id', 'AnswersController.getById')
  Route.get('intraction/:id', 'AnswersController.getbyIntraction')

  Route.post('/', 'AnswersController.create')
  Route.put('/', 'AnswersController.update')
  Route.delete('/:id', 'AnswersController.destroy')
}).prefix('answer')

Route.group(()=>{
  Route.get('/', 'BlockListsController.get')
  Route.get('/:id', 'BlockListsController.getById')
  Route.post('/', 'BlockListsController.create')
  Route.put('/', 'BlockListsController.update')
  Route.delete('/:id', 'BlockListsController.destroy')
}).prefix('blockList')

Route.group(()=>{
  Route.get('/', 'CategoriesController.get')
  Route.get('/:id', 'CategoriesController.getById')
  Route.post('/', 'CategoriesController.create')
  Route.put('/', 'CategoriesController.update')
  Route.delete('/:id', 'CategoriesController.destroy')
}).prefix('category')

Route.group(()=>{
  Route.get('/', 'CountriesController.get')
  Route.get('/:id', 'CountriesController.getById')
  Route.post('/', 'CountriesController.create')
  Route.put('/', 'CountriesController.update')
  Route.delete('/:id', 'CountriesController.destroy')
 }).prefix('country')

  Route.group(()=>{
   Route.get('/', 'EventsController.get')
   Route.get('admin', 'EventsController.getAllAdmnin')
   Route.get('org/:id', 'EventsController.getAllOrg')
  Route.get('orgids/:id', 'EventsController.getAllOrgids')
   Route.get('/nonpast', 'EventsController.getWithNoPastEvents')
   Route.get('getpast', 'EventsController.getPastEvents')
   Route.get('getpastcount', 'EventsController.getPastcountEvents')
   Route.get('getfuturecount', 'EventsController.getFuturecountEvents')
   Route.get('getlivecount', 'EventsController.getLivecountEvents')
   Route.get('getlateid', 'EventsController.getLateId')

   Route.get('count', 'EventsController.getSysCount')
   Route.get('totalviews', 'EventsController.getSysTotalViews')
   Route.get('getpastorg/:id', 'EventsController.getPastorgEvents')
   Route.get('getfutureorg/:id', 'EventsController.getFutureorgEvents')
   Route.get('getliveorg/:id', 'EventsController.getLiveorgEvents')
   Route.get('getfuture', 'EventsController.getFutureEvents')
   Route.get('/hot', 'EventsController.getHot')
   Route.get('count/:id', 'EventsController.getCount')
   Route.get('getlive', 'EventsController.getLiveEvents')
   Route.get('/:id', 'EventsController.getById')
   Route.post('/upload',  "EventsController.uploadImage")
   Route.get('totalviews/:id', 'EventsController.getTotalViews')
   Route.get('totaleventviews/:id', 'EventsController.getEventViews')
   Route.post('/', 'EventsController.create')
   Route.put('/', 'EventsController.update')
   Route.put('increment/:id', 'EventsController.updateViews')

   Route.delete('/:id', 'EventsController.destroy')
  }).prefix('event')
     
Route.group(()=>{
  Route.get('/', 'InteractionsController.get')
  Route.get('/:id', 'InteractionsController.getById')
  Route.post('/', 'InteractionsController.create')
  Route.put('/', 'InteractionsController.update')
  Route.delete('/:id', 'InteractionsController.destroy')
}).prefix('interaction')

Route.group(()=>{
  Route.get('/', 'ImagesController.get')
  Route.post('/upload', 'ImagesController.uploadImage')
  Route.get('/:id', 'ImagesController.getById')
  Route.post('/', 'ImagesController.create')
  Route.put('/', 'ImagesController.update')
  Route.delete('/:id', 'ImagesController.destroy')
}).prefix('image')

Route.group(()=>{
  Route.get('/', 'ReportsController.get')
  Route.get('/:id', 'ReportsController.getById')
  Route.post('/', 'ReportsController.create')
  Route.put('/', 'ReportsController.update')
  Route.delete('/:id', 'ReportsController.destroy')
}).prefix('report')

Route.group(()=>{
  Route.get('/', 'ratesController.get')
  Route.get("/rating/", "ratesController.getRating")
  Route.get("/totals/", "ratesController.getTotalRates")
  Route.post('/', 'ratesController.create')
}).prefix('rate')

Route.group(()=>{
  Route.get('/', 'SpotsController.get')
  Route.get('getpast', 'SpotsController.getPastSpots')
  Route.get('getpast/auth', 'SpotsController.getPastSpotsByAuth')
  Route.get('getupcoming', 'SpotsController.getUpcomingSpots')
  Route.get('totalattendance/:id', 'SpotsController.getTotalAttendee')
  Route.get('totaleventattendee/:id', 'SpotsController.getEventAttendee')
  Route.get('count', 'SpotsController.getCount')
  Route.get('totalSyseventattendee', 'SpotsController.getSysTotalAttendee')
  Route.get('/:id', 'SpotsController.getById')
  Route.post('/', 'SpotsController.create')
  Route.put('/', 'SpotsController.update')
  Route.delete('/:id', 'SpotsController.destroy')
}).prefix('spot')

Route.group(()=>{
  Route.get('/', 'TagsController.get')
  Route.get('/:id', 'TagsController.getById')
  Route.post('/', 'TagsController.create')
  Route.put('/', 'TagsController.update')
  Route.delete('/:id', 'TagsController.destroy')
}).prefix('tag')

Route.group(()=>{
  Route.get('/', 'UsersController.get')
  Route.get('org', 'UsersController.getAllOrg')
  Route.get('req', 'UsersController.getAllRequest')
  Route.get('count', 'UsersController.count')
  Route.get('countOrg', 'UsersController.countOrg')
  Route.get('countPen', 'UsersController.countPen')
  Route.get('countAtten', 'UsersController.countAtten')
  Route.get('/:id', 'UsersController.getById')
  Route.post('/', 'UsersController.create')
  Route.post('/login', 'UsersController.login')
  Route.post('logout', 'UsersController.logout')
  Route.post('/upload', 'UsersController.uploadImage')
  Route.post('/email', 'UsersController.sendEmail')
  Route.put('/', 'UsersController.update')
  Route.put('verify/:id', 'UsersController.verify')
  Route.put('disapprove/:id', 'UsersController.disapprove')
//? changed for admin
  Route.delete('/:id', 'UsersController.destroy')
}).prefix('user')