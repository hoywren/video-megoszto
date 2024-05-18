import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {Video} from "../models/Video";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private afs: AngularFirestore) { }

  getVideos(): Observable<Video[]> {
    return this.afs.collection<Video>('videos').valueChanges();
  }

  getVideo(index: number): Observable<Video> {
    return this.afs.collection<Video>('videos', ref => ref
      .orderBy('uploadDate')
      .limit(index))
      .valueChanges()
      .pipe(
        map(videos => videos[index - 1])
      );
  }

  uploadVideo(video: Video){
    return this.afs.collection<Video>('videos').add(video).then(docRef => {
      video.id = docRef.id;
      return this.afs.collection('videos').doc(docRef.id).update(video);
    }).catch(error => {
      console.error(error);
    });
  }

  loadMore(count: number): Observable<Video[]> {
    return this.afs.collection<Video>('videos', ref => ref
      .orderBy('uploadDate')
      .limit(count)
    )
      .valueChanges();
  }

  getVideosByUploader(uploadedBy: string): Observable<Video[]> {
    return this.afs.collection<Video>('videos', ref => ref
      .where('uploadedBy', '==', uploadedBy)
    )
      .valueChanges();
  }

  deleteVideo(id: string): Promise<void> {
    return this.afs.doc(`videos/${id}`).delete();
  }
}
