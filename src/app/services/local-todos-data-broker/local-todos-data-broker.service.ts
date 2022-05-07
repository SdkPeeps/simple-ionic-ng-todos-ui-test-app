import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { ImplTodosDataBroker, Todo, TodosDataBrokerConfig,
  TodosDataBrokerEvent, URL_META_API_LAYER_CONFIG,
   URL_META_RAPID_API_CONFIG } from 'todos-lib';

import * as CONFIG from '../../config/app-config';
import { CRUD } from 'app-base-lib';
import { ListDataBrokerLoadOneOptions } from 'app-base-lib';
import { ListDataBrokerResult } from 'app-base-lib';
import { ListDataBrokerLoadOptions } from 'app-base-lib';
import { PAGE_SECTION_POSITION } from 'vicky-ionic-ng-lib';


@Injectable({
  providedIn: 'root'
})
export class LocalTodosDataBrokerService extends ImplTodosDataBroker{

  constructor( platform: Platform, alertCtrl: AlertController,
     toastCtrl: ToastController,loadingCtrl: LoadingController ) {
    super(platform as any, toastCtrl as any, alertCtrl as any,
      loadingCtrl as any,{perPage:CONFIG.paginationOptions.perPage,append:false});
  }

  getConfig(): TodosDataBrokerConfig {
    return {
      pagination:{
        perPage: 10,
      },
      ui:{
        general: {
          pagination:{
            enabled:true,
          },
          swipeRefresh:{
            enabled:true,
          },
          spinner: {
            type: 'bubbles'
          },
          toast: {
            duration: 5000,
            position: 'top',
            btnText: 'Okay'
          },
          buttons: {
            core: {
              sectionPosition: PAGE_SECTION_POSITION.IN_CONTENT
            }
          },
          broswer: {
            target: 'system'
          }
        },
        pages:{
          links:{
            title:{
              label:'Your Links'
            },
            reconciliation:{
              intervalSecs:10 * 60,
            }
          },
          linksDetailEditor:{
            title:{
              label:'Add Link'
            },
            buttons:{
              main:{
                nextLabel: 'next',
                backLabel:'back',
                confirmLabel: 'proceed'
              }
            },
            behavior: {
              urlInfo:{
                progressMsg: 'Fetching Link Info',
                successMsg: 'Info fetched successfully'
              }
            }
          }
        }
      },
      thirdParty: {
        api: {
          urlMeta: false ? {
            key: 'CiXFC31LtTC2rtO5ArNp4rJchw6WKeKI',
            service: 'api-layer',
            url: 'https://api.apilayer.com/meta_tags',
          } as URL_META_API_LAYER_CONFIG : {
            service: 'rapid-api',
            url: 'https://site-metadata.p.rapidapi.com/metadata/',
            apiHost: 'site-metadata.p.rapidapi.com',
            key: 'a398cf8e51mshcdf0d3353264488p1835e8jsnaf1369c53f2b'
          } as URL_META_RAPID_API_CONFIG
        }
      }
    };
  }

  async onCRUD(crudType: CRUD, link?: Todo): Promise<Todo>{

    let todos = await this.getStore();

    switch(crudType){
      case CRUD.CREATE:
        todos.push(todos);

        todo.id = Date.now();
        break;
      case CRUD.DELETE:
        todos = todos.filter( _todo => _todo.id !== todo.id);
        break;
      case CRUD.UPDATE:
        todos = todos.map( _todo => _todo.id === todo.id ? todo:_todo);
        break;
    }

    await this.saveStore(todos);

    return todo;
  }

  async on(ev: LinksDataBrokerEvent): Promise<any>{
  }

  async canCRUD(crudType: CRUD): Promise<boolean>{
    return true;
  }

  /**
   * @param options the options that can be used to fetch the data
   * @returns an object that contains the data
   */
  async fetchOne(options: ListDataBrokerLoadOneOptions): Promise<ListDataBrokerResult<Link>>{

    const links = await this.getStore();

    return {
      data:links.find( link => link.id === options.id )
    };
  }

  /**
   * @param options the options that can be used to fetch the data
   * @returns an object that contains the array of data
   */
  async fetch(options: ListDataBrokerLoadOptions<Link>
    ): Promise<ListDataBrokerResult<Link[]>>{

    console.log('localLinksDataBroker.fetch() : ',options);

    let links = await this.getStore();

    // apply pagination
    links = links.slice( ( options.page - 1 ) * options.perPage , options.page * options.perPage );

    const result = {
      data: links
    };

    console.log('localLinksDataBroker.fetch() result : ',result);

    return result;
  }

  private async getStore(): Promise<Link[]>{

    // simulate delay
    await timer(3000).pipe(first()).toPromise();

    const storeValue = localStorage.getItem( '--links-array' );

    const result = (storeValue ? JSON.parse(storeValue) as Array<Link> : []).reverse();
    console.log('localLinksDataBroker.getStore()',result);
    return result;


  }

  private async saveStore(links: Link[]): Promise<any>{
    localStorage.setItem( '--links-array' , JSON.stringify(links) );
  }

}
