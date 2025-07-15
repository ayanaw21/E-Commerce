from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.urls import reverse
from django.utils.text import slugify
class Category(models.Model):
    name = models.CharField(max_length=255,db_index=True)
    slug = models.SlugField(max_length=200,unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('name',)
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    def save(self,*args,**kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        if self.slug != slugify(self.name):
            self.slug = slugify(self.name)
        super().save(*args,**kwargs)

    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse('product:product_list_by_catagory',args=[self.slug])

class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, related_name="products")
    name = models.CharField(max_length=255,db_index = True)
    description = models.TextField(blank=True)
    slug = models.SlugField(max_length=200,db_index=True)
    price = models.DecimalField(max_digits=10,decimal_places=2,validators=[MinValueValidator(0)])
    stock_quantity = models.IntegerField(validators=[MinValueValidator(0)])
    updated_at = models.DateTimeField(auto_now=True)
    available = models.BooleanField(default=True)
    image = models.ImageField(upload_to='products/%Y/%m/%d', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta: 
        ordering = ['-created_at']
        indexes = [
        models.Index(fields=['id', 'slug']),
    ]


    def save(self,*args,**kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        if self.slug != slugify(self.name):
            self.slug = slugify(self.name)
        super().save(*args,**kwargs)

    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse('product:product_detail', args=[self.id,self.slug])

