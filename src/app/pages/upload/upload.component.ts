import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {VideoService} from "../../shared/services/video.service";
import {Video} from "../../shared/models/Video";
import {Router} from "@angular/router";
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  uploadForm = this.fb.group({
    shortLink: ['', Validators.required]
  });

  user;

  constructor(private videoService: VideoService,
              private fb: FormBuilder,
              private router: Router) {
    let user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : null;
  }

  ngOnInit(): void {
  }

  getYouTubeVideoId(url: string) {
    const longUrlRegExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const shortUrlRegExp = /youtube\.com\/shorts\/([^#&?]+)/;

    let match = url.match(longUrlRegExp);
    if (match && match[7].length == 11) {
      return match[7];
    } else {
      match = url.match(shortUrlRegExp);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  }

  upload(): void {
    const shortLinkControl = this.uploadForm.get('shortLink');

    if (shortLinkControl) {
      let video: Video = {
        id: "",
        shortLink: this.getYouTubeVideoId(shortLinkControl.value || '') || '',
        uploadedBy: this.user?.uid,
        uploadDate: Date.now().toString()
      }

      this.videoService.uploadVideo(video)
        .then(() => console.log('Video uploaded successfully'))
        .catch((err) => console.error('Error:', err));
    } else {
      console.error("shortLink form control is not found");
    }

    console.log(this.videoService.getVideos());
  }
}
