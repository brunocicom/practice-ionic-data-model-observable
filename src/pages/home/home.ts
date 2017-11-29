import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

import { Checklist, ChecklistItem } from './../../models/checklist.models';

@IonicPage({
  name: "HomePage"
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  checklist: Checklist = null;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {
    this.checklist = new Checklist('My Checklist');
  }

  ionViewDidLoad() {
    this.checklist.addItem("Item 1");
  }

  renameChecklist() {
    this.alertCtrl.create({
      title: 'Update Checklist title',
      message: 'Enter the title for this checlist:',
      inputs: [
        {
          name: 'title',
          value: this.checklist.title
        }
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.checklist.setTitle(data.title);
          }
        }
      ]
    }).present();
  }

  addNewItem() {
    this.alertCtrl.create({
      title: 'Add new item',
      message: 'Enter the name of for this checlist below:',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.checklist.addItem(data.name);
          }
        }
      ]
    }).present();
  }

  deleteItem(item: ChecklistItem) {
    this.alertCtrl.create({
      title: 'Delete item',
      message: 'Are you sure you want to delete the item?',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          handler: data => {
            this.checklist.removeItem(item);
          }
        }
      ]
    }).present();
  }
}
