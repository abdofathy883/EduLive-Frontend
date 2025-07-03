import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { BlogService } from '../../Services/Blog/blog.service';
import { Blog } from '../../Models/Blog/blog';
import { th } from 'intl-tel-input/i18n';

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent implements OnInit {
  private blogService = inject(BlogService);
  @Output() openBlog = new EventEmitter<number>();
  Blogs: Blog[] = [];

  pageSize = 9; // blogs per page
  currentPage = 1;

  // Blogs = Array.from({ length: 19 }, (_, i) => ({
  //   id: i + 1,
  //   title: `Blog Title ${i + 1}`,
  //   image: '/assets/minimalism4.jpg',
  //   description: `Blog Description ${i + 1}`,
  // }));

  pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get pagedBlogs() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.Blogs.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.Blogs.length / this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((blogs) => {
      console.log(blogs);
      this.Blogs = blogs;
    });
  }

  goToPost(id: number) {
    this.openBlog.emit(id);
  }
}

