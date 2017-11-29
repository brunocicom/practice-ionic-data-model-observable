import { ChecklistItem } from './checklist.models';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Checklist {

    private _items: ChecklistItem[];
    public title: string = "";

    private _observableList: BehaviorSubject<ChecklistItem[]> = new BehaviorSubject([]);
    private _observableTitle: BehaviorSubject<string> = new BehaviorSubject("");

    constructor(title: string) {

        this._items = [];
        this.setTitle(title);
    }

    get item(): ChecklistItem[]{
        return this._items;
    }

    get length(): number {
        return this._items.length;
    }

    get observableList(): Observable<ChecklistItem[]> {
        return this._observableList.asObservable();
    }

    get observableTitle(): Observable<string>{
        return this._observableTitle.asObservable();
    }

    addItem(title: string): void {

        this._items.push({
            title: title,
            checked: false
        });

        this._observableList.next(this._items);
    }

    removeItem(item: ChecklistItem): void {

        let index = this._items.indexOf(item);
        if (index > -1) {
            this._items.splice(index, 1);
        }

        this._observableList.next(this._items);
    }

    renameItem(item: ChecklistItem, title: string): void {

        let index = this._items.indexOf(item);
        if (index > -1) {
            this._items[index].title = title;
        }

        this._observableList.next(this._items);
    }

    setTitle(title: string): void {

        this.title = title;
        this._observableTitle.next(this.title);
    }

    toggleItem(item: ChecklistItem): void {

        item.checked = !item.checked;
        this._observableList.next(this._items);
    }
}

export interface ChecklistItem {
    title: string,
    checked: boolean
}