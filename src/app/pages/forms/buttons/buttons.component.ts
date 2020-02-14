import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-buttons',
  styleUrls: ['./buttons.component.scss'],
  templateUrl: './buttons.component.html',
})
export class ButtonsComponent {
  citiesList = [];
  placesList = [];
  usersSettings: any;

  ngOnInit() {
    this.usersSettings = {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        title: {
          title: 'Название',
          type: 'string',
        },
        description: {
          title: 'Описание',
          type: 'string',
        },
        city: {
          title: 'Город',
          type: 'string',
        },
        area: {
          title: 'Районы',
          type: 'array',
        },
        price: {
          title: 'Цена',
          type: 'number',
        },
      },
    };
  }

  usersSource: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private http: HttpClient) {
    this.http.get<any>('http://localhost:4615/places').subscribe(res => {
      res.forEach(place => {
        this.citiesList.push({ value: place.city, title: place.city });
        this.placesList.push({ value: place.areas, title: place.areas });
      });
      this.usersSettings = {
        add: {
          addButtonContent: '<i class="nb-plus"></i>',
          createButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
          confirmCreate: true,
        },
        edit: {
          editButtonContent: '<i class="nb-edit"></i>',
          saveButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
          confirmSave: true,
        },
        delete: {
          deleteButtonContent: '<i class="nb-trash"></i>',
          confirmDelete: true,
        },
        columns: {
          title: {
            title: 'Название',
            type: 'string',
          },
          description: {
            title: 'Описание',
            type: 'string',
          },
          city: {
            title: 'Город',
            type: 'string',
            editor: { type: 'list', config: { list: this.citiesList } },
          },
          area: {
            title: 'Районы',
            type: 'array',
            editor: { type: 'list', config: { list: this.placesList } },
          },
          price: {
            title: 'Цена',
            type: 'number',
          },
        },
      };
    });
    this.http.get<any>('http://localhost:4615/products').subscribe(res => {
      this.usersSource.load(res);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Вы точно хотите удалить эту запись?')) {
      this.http.delete<any>('http://localhost:4615/products', {params: event.data, responseType: 'blob' as 'json'})
        .subscribe(() => {});
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event) {
    if (window.confirm('Вы точно хотите отредактировать данную запись?')) {
      const summaryData = {
        old: JSON.stringify(event.data),
        new: JSON.stringify(event.newData),
      };
      this.http.put<any>('http://localhost:4615/products', {}, { params: summaryData, responseType: 'blob' as 'json' })
        .subscribe(() => {});
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Вы точно хотите создать данную запись?')) {
      this.http.post<any>('http://localhost:4615/products', {}, { params: event.newData, responseType: 'blob' as 'json' })
        .subscribe(() => {});
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
