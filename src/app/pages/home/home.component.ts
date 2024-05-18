import {Component, OnInit} from '@angular/core';
import {VideoService} from "../../shared/services/video.service";
import {FormBuilder} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import {Video} from "../../shared/models/Video";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];
  count: number = 50;

  constructor(private videoService: VideoService,
              private fb: FormBuilder,
              private sanitizer: DomSanitizer) {
  }

  scrollPosition = 0;

  private shuffleVideos(array: Video[]): Video[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  ngOnInit(): void {
    this.scrollPosition = window.scrollY;
    this.videoService.loadMore(this.count).subscribe((videos: Video[]) => {
      console.log(videos);
      this.videos = this.shuffleVideos(videos);
      this.count += 2;

      window.scrollTo(0, this.scrollPosition);
    });
  }

  onScroll() {
    console.log('scrolled!!');
    this.count += 1;
    this.addVideos();
  }

  addVideos() {
    this.videoService.getVideo(this.count).subscribe((video: any) => {
      this.videos.push(video);
    });
  }

  loadMore() {
    this.scrollPosition = window.scrollY;
    this.videoService.loadMore(this.count).subscribe((videos: Video[]) => {
      this.videos = videos;
      this.count += 1;

      window.scrollTo(0, this.scrollPosition);
    });
  }
}
