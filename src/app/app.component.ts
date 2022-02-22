import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {HttpClient} from '@angular/common/http';
import { FormControl } from '@angular/forms';
import {v4 as uuidv4} from 'uuid';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'project-front-end';
  products: any;

  ngOnInit(): void {
    this.getProducts();
  }

  submit(send){
    const api = environment.productsApi+"products/";
    let myuuid = uuidv4();
    const product = {
      "id": myuuid,
      "name": send.controls.name.value,
      "price": send.controls.price.value,
      "stock": send.controls.stock.value,
      "pvp": send.controls.pvp.value
      };
      axios.post(api, product).then( data => {
        console.log(data);
        this.getProducts();
      }).catch(err => {
        console.error(err);
      });

  }

  getById(search){
    const productId = search.controls.search.value;

    console.log(productId);
    const api = environment.productsApi+"products/"+productId;
    console.log(api);
    axios.get(api).then( data => {
      console.log(data.data);
      this.products = data.data;
    }).catch(err => {
      console.error(err);
    });

  }

  getProducts() {
    const api = environment.productsApi+"products";
    
      axios.get(api).then( data => {
        console.log(data.data);
        this.products = data.data;
      }).catch(err => {
        console.error(err);
      });
    
    
  }
}

