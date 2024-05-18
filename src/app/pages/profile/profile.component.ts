import {Component, OnInit} from '@angular/core';
import {Video} from "../../shared/models/Video";
import {VideoService} from "../../shared/services/video.service";
import {FormBuilder} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  user;

  videos: Video[] = [];
  constructor(private videoService: VideoService,
              private fb: FormBuilder,
              private sanitizer: DomSanitizer) {
    let user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : null;
  }

  ngOnInit() {
    this.loadVideos();
  }

  loadVideos(){
    this.videoService.getVideosByUploader(this.user?.uid).subscribe((videos: Video[]) => {
      this.videos = videos;
    });
  }

  deleteVideo(id: string) {
    this.videoService.deleteVideo(id).then(
      () => {
        console.log('Video deleted successfully');
        this.videos = this.videos.filter(video => video.id !== id);
      },
      error => {
        console.log('There was an error deleting the video:', error);
      }
    );
  }
}
