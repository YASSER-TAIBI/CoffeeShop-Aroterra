import {inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Testimonial} from "../models/testimonial";

const PATH = 'testimonial';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private _firestore=inject(Firestore);
  private  _collection = collection(this._firestore, PATH);

  getTestimonial() {
    return collectionData(this._collection, {idField:'id'}) as Observable<Testimonial[]>;
  }

  addTestimonial(testimonial: Testimonial) {
    return addDoc(this._collection, testimonial);
  }

  deleteTestimonial(id: string) {
    const testimonialDocRef = doc(this._firestore, `${PATH}/${id}`);
    return deleteDoc(testimonialDocRef);
  }
}
