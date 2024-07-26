import { Injectable } from '@angular/core';
import {delay, Observable, of} from "rxjs";

import { Task } from "./task.types";

const TASKS: Array<Task> = [
  {
    id: '1',
    title: 'Header з курсом валют',
    subTasks: [
      {id: '4', title: 'У header-е необхідно відображати актуальнийй курс валют (USD, EUR) по відношенню до гривні (UAH)', completed: true},
      {id: '5', title: 'Актуальний курс валют повинен приходити з будь-якого публічного API', completed: true}
    ]
  },
  {
    id: '2',
    title: 'Компонент із конвертацією',
    subTasks: [
      {id: '6', title: 'Для однієї валюти має бути свій input і select', completed: true},
      {id: '7', title: 'Окремий input+select для першої валюти, і окремий input+select для другої валюти', completed: true},
      {id: '8', title: 'В input задається число, щоб вказати кілкість одиниць для конвертування', completed: true},
      {id: '9', title: 'У select має бути не меньше трьох валют - UAH, USD, EUR.', completed: true},
      {id: '10', title: 'Конвертація має відбуватися в обох напрямках', completed: true,
        subTasks: [
          { id: '13', title: 'при зміні значення у першій валюті, має перераховуватися значення у другій, і навпаки', completed: true },
          { id: '14', title: 'при зніні валюти у кожному select-і конвертація обох валют повинна перераховуватися корректно', completed: true },
        ]
      },
    ]
  },
  {
    id: '3',
    title: 'Плюсом буде',
    subTasks: [
      {id: '11', title: 'Добре продуманий інтерфейс та зовнішній вигляд', completed: true},
      {id: '12', title: 'Чистий код', completed: true}
    ]
  }
];

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  public getTasks(): Observable<Array<Task>> {
    return of(TASKS).pipe(
      delay(100)
    );
  }
}
