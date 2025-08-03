import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../Services/Blog/blog.service';
import { Blog } from '../../Models/Blog/blog';

@Component({
  selector: 'app-blog-post',
  imports: [],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})
export class BlogPostComponent implements OnInit {
  currentBlogId!: number;

  blogPost: Blog = {
    id: 0,
    title: '',
    content: '',
    postImage: '',
    createdAt: ''
  }
  constructor(private blogService: BlogService) {}
  
  ngOnInit(): void {
    this.blogService.getById(this.currentBlogId).subscribe(post => {
      this.blogPost = {
        id: post.id,
        title: post.title,
        content: post.content,
        postImage: post.postImage,
        createdAt: post.createdAt
      };
    });
  }
}
