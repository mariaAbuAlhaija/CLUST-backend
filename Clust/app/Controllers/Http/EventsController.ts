import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'

import {schema,rules} from '@ioc:Adonis/Core/Validator'
import Image from 'App/Models/Image'
import Application from '@ioc:Adonis/Core/Application'

export default class EventsController {

    public async get(){
        
        var result = await Event.query().preload("images").preload('organizer').preload("spot").preload("country").preload("interaction")
        return result;
     }  
    //!!!!!!!
    public async getByAuth(ctx: HttpContextContract){
        const user = await ctx.auth.authenticate()
        var result = await Event.query().where("id", user.id).preload("images").preload('organizer').preload("spot").preload("country").preload("interaction");
        return result
    }  
    public async getLateId(){
        
      var result = await Event.query().select('id').orderBy('id', 'desc').first()
      return result
  }  
    public async getAllAdmnin() {
      const users = await Event.query().preload('organizer', (builder) => {
        builder.select('email')
      }).preload('report')
      return users
    }
    public async getAllOrg(ctx: HttpContextContract) {
      const user = await ctx.params

      const users = await Event.query().preload("images").preload('organizer', (builder) => {
        builder.select('email')
      }).where("organizer_id", user.id).preload('report').preload('spot').preload("country").preload("interaction");
      return users
    }
    public async getAllOrgids(ctx: HttpContextContract) {
      const user = await ctx.params

      const users = await Event.query().select('id').where("organizer_id", user.id);
      return users
    }
    public async getWithNoPastEvents(){
        const moment = require('moment')

        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
        console.log(currentDateTime)
        
        var result = await Event.query().where('end_date', '>=', currentDateTime).preload("images").preload('organizer').preload("spot").preload("country").preload("interaction");
        return result
    }  

    public async getHot(){
      const moment = require('moment')

      const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')

        var result = await Event.query().where('end_date', '>=', currentDateTime).orderBy("views", "desc").limit(2).preload("images").preload('organizer').preload("spot").preload("country").preload("interaction");
        return result
    }  
 
    public async getEventViews(ctx: HttpContextContract) {
        var id= ctx.params.id
  
        var result = await Event.query()
        .select('views')
        .where('id','=',id);
        return result;
      }
      
      public async getTotalViews(ctx: HttpContextContract) {
        var id= ctx.params.id
  
        var result = await Event.query()
        .select('views')
        .where('events.organizer_id', '=', id).sum('views as totalviwes').groupBy('events.id');
        return result;
      }
      
    
    
    public async getLiveEvents () {
        const moment = require('moment')

        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
        console.log(currentDateTime)
       
        // var liveEvents = await Event.query().preload("images")
        //  .where('start_date', '<=', now)
        //  
        // return liveEvents
       
        
        var result = Event.query().where('start_date','<=', currentDateTime).where('end_date', '>', currentDateTime).preload("images").preload('organizer').preload("spot").preload("country").preload("interaction");
        return result
      }
      public async getLiveorgEvents (ctx: HttpContextContract) {
        const moment = require('moment')
        var id= ctx.params.id

        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
         
        
        var result =await Event.query().select('*').where('start_date','<=', currentDateTime).where('end_date', '>', currentDateTime).where('organizer_id','=',id).preload("country").preload("interaction");
        return result.length;
      }
      public async getPastorgEvents (ctx: HttpContextContract) {
        const moment = require('moment')
        var id= ctx.params.id

        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
         
        
        var result =await Event.query().select('*').where('end_date', '<', currentDateTime).where('organizer_id','=',id).preload("country").preload("interaction");
        return result.length;
      }
      public async getFutureorgEvents (ctx: HttpContextContract) {
        const moment = require('moment')
        var id= ctx.params.id

        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
         
        
        var result =await Event.query().select('*').where('start_date', '>', currentDateTime).where('organizer_id','=',id).preload("country").preload("interaction");
        return result.length;
      }
      public async getCount(ctx: HttpContextContract) {
        var id= ctx.params.id

        var result = await Event.query().select('*').where('organizer_id','=',id);
        return result.length;
      }


      //==========================sys calls================================
      public async getLivecountEvents () {
        const moment = require('moment')

        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
         
        
        var result =await Event.query().select('*').where('start_date','<=', currentDateTime).where('end_date', '>', currentDateTime)
        return result.length;
      }
      public async getPastcountEvents () {
        const moment = require('moment')

        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
         
        
        var result =await Event.query().select('*').where('end_date', '<', currentDateTime)
        return result.length;
      }
      public async getFuturecountEvents () {
        const moment = require('moment')

        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
         
        
        var result =await Event.query().select('*').where('start_date', '>', currentDateTime)
        return result.length;
      }
      public async getSysCount() {

        var result = await Event.query().select('*')
        return result.length;
      }
      public async getSysTotalViews( ) {
    
        var result = await Event.query()
        .select('views')
       .sum('views as totalviwes').groupBy('events.id');
        return result;
      }
      

      //===================================================
      public async getPastEvents () {
        const moment = require('moment')

        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
        console.log(currentDateTime)
    
        
        var result = Event.query().where('end_date', '<', currentDateTime).preload("images").preload('organizer').preload("spot").preload("country").preload("interaction")
        return result
      }
      
    //   public async getPastEventsByAuth (ctx: HttpContextContract) {
    //     var user = await ctx.auth.authenticate()

    //     const moment = require('moment')

    //     const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
    //     console.log(currentDateTime)
    
        
    //     var result = Event.query().where("user_id",user.id).where('end_date', '<', currentDateTime).preload("images").preload('organizer').preload("spot")
    //     return result
    //   }

      public async getFutureEvents () {
        const moment = require('moment')

        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
        console.log(currentDateTime)
    
        
        var result = Event.query().where('start_date', '>', currentDateTime)
        return result
      }
      

      public async getPastEventss () {
        const moment = require('moment')

        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
        console.log(currentDateTime)
       
        // var liveEvents = await Event.query().preload("images")
        //  .where('start_date', '<=', now)
        //  
        // return liveEvents
        
        
        var result = Event.query().where('end_date', '<', currentDateTime).preload("images").preload('organizer').preload("spot").preload("country").preload("interaction")
       
      }

    public async getById(ctx: HttpContextContract){
        var id= ctx.params.id
        var result = Event.query().where("id", id).preload("images").preload('organizer').preload("spot") .preload("country").preload("interaction")
        return result
    }
//TODO
    public async addImage(ctx: HttpContextContract){
        const newSchema= schema.create({

         path: schema.string(),
         event_id: schema.number([
            rules.exists({
                table: 'events',
                column:'id'
            }),
        ]),
        is_memory:schema.boolean()
        })
        var fields= await ctx.request.validate({schema: newSchema})
        var image= new Image()

        image.path= fields.path
        image.isMemory=fields.is_memory
        image.eventId=fields.event_id    
        var result= await image.save()
        return result
     }
//
    public async create(ctx: HttpContextContract){

        const newSchema= schema.create({
            name : schema.string(),
            description :schema.string(),
            category_id: schema.number([
                rules.exists({
                    table: 'categories',
                    column:'id'
                }),

            ]),
            // country_id: schema.number([
            //     rules.exists({
            //         table: 'countries',
            //         column:'id'
            //     }),

            // ]),
            country_id: schema.number([
              rules.exists({
                  table: 'countries',
                  column:'id'
              }),

          // ]),
          ]),
            organizer_id: schema.number([
                rules.exists({
                    table: 'users',
                    column:'id'
                }),

            ]),
            
            start_date: schema.date(),
            end_date: schema.date(),
            status:schema.enum(["available","unavailable"]),
            views:schema.number(),
            capacity: schema.number(),
             // address:schema.string()
            address:schema.string()
        })
        var fields= await ctx.request.validate({schema: newSchema, messages:{
            "exists": "{{field}} (foreign key) is not existed"
        } })
      
            var event = new Event()
            event.name=  fields.name

            event.description= fields.description
            event.categoryId=  fields.category_id
            // event.countryId=  fields.country_id
            event.countryId=  fields.country_id

            event.organizerId= fields.organizer_id
            event.start_date= fields.start_date.toString()
            event.end_date=    fields.end_date.toString()
            event.status=    fields.status
            event.views=   fields.views
            event.capacity=  fields.capacity
           // event.thanking_message= fields.thanking_message
            // event.address= fields.address
            event.address= fields.address
            await event.save()
            var result= Event.query().where("id", event.id).preload("images").preload('organizer').preload("spot").preload("country")
            return result

    }

    public async update(ctx: HttpContextContract){

        const newSchema= schema.create({
            name : schema.string(),
            description :schema.string(),
            category_id: schema.number([
                rules.exists({
                    table: 'categories',
                    column:'id'
                }),

            ]),
        //  country_id: schema.number([
        //         rules.exists({
        //             table: 'countries',
        //             column:'id'
        //         }),

        //     ]),
            organizer_id: schema.number([
                rules.exists({
                    table: 'users',
                    column:'id'
                }),

            ]),
            
            start_date: schema.date(),
            end_date: schema.date(),
            status:schema.enum(["available","unavailable"]),
            views:schema.number(),
            capacity: schema.number(),
            thanking_message:schema.string(),
            id: schema.number(),
            // address:schema.string()

        })
        var fields= await ctx.request.validate({schema: newSchema, messages:{
            "exists": "{{field}} (foreign key) is not existed"
        } })
        var event=  await Event.findOrFail(fields.id)
            event.name=  fields.name
            event.description= fields.description
            event.categoryId=  fields.category_id
            // event.countryId=  fields.country_id
            event.organizerId= fields.organizer_id
            event.start_date= fields.start_date.toString()
            event.end_date=    fields.end_date.toString()
            event.status=    fields.status
            event.views=   fields.views
            event.capacity=  fields.capacity
        //    event.thanking_message= fields.thanking_message
            // event.address= fields.address

            var result= await event.save()
            return result
    }
   public async updateViews(ctx: HttpContextContract) {
    
    const id = ctx.params.id;

    try {
     
      const event = await Event.findOrFail(id);
      event.views += 1;
    
      await event.save()
       var result=  Event.query().where("id", event.id).preload("images").preload('organizer').preload("spot").preload("country")
      return { message: 'Event not found' }
    } catch (error) {
      return { message: 'Event not found' };
    }
   }
    public async destroy(ctx: HttpContextContract){
        try{
            var id = ctx.params.id;
            var  event = await  Event.findOrFail(id);
            try{
            await  event.delete();
            return { message: "The  event has been deleted!" }
            }
            catch(e: unknown){
              return  { message: "Cannot delete a used foreign key ;(" }
            }
            }
            catch(e:unknown){
                return { message: "Event not found ;(" }
            }
    }
    public async uploadImage(ctx: HttpContextContract){
      
        var image= ctx.request.file("image")        

        if(!image) return{ message: "Invalid file" }
        await image!.move(Application.publicPath("images"))
        return { path:"images/"+ image!.fileName }
      }
}
