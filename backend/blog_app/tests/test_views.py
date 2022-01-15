from django.test import TestCase
from django.contrib.auth import get_user_model

from ..models import Post
User = get_user_model()

class BlogTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a User
        testuser1 = User.objects.create_user(
            email='testuser1@example.com',
            password='abc123!'
        )
        testuser1.save()

        # Create a blog post
        test_post = Post.objects.create(
            author=testuser1,
            title='Blog title',
            slug='test-post1',
            thumbnail='https://test.com/cat.jpg',
            body='Body content...'
        )
        test_post.save()

    def test_blog_content(self):
        post = Post.objects.get()
        expected_author = f'{post.author}'
        expected_title = f'{post.title}'
        expected_slug = f'{post.slug}'
        expected_thumbnail = f'{post.thumbnail}'
        expected_body = f'{post.body}'
        self.assertEquals(expected_author, 'testuser1@example.com')
        self.assertEquals(expected_title, 'Blog title')
        self.assertEquals(expected_slug, 'test-post1')
        self.assertEquals(expected_thumbnail, 'https://test.com/dog.jpg')
        self.assertEquals(expected_body, 'Body content...')
