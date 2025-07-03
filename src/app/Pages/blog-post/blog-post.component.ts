import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../Services/Blog/blog.service';

@Component({
  selector: 'app-blog-post',
  imports: [],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})
export class BlogPostComponent implements OnInit {
  currentBlogId!: number;

  blogPost: any;
  constructor(private blogService: BlogService) {}
  
  ngOnInit(): void {
    this.blogService.getBlogById(this.currentBlogId).subscribe(post => {
      this.blogPost = post;
    });
  }

  
}
