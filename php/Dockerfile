# Use the official PHP 5.6-FPM image as the base image
FROM php:8.2-fpm

# Install additional dependencies
RUN apt-get update && apt-get install -y \
		libfreetype-dev \
		libjpeg62-turbo-dev \
		libpng-dev \
    libxml2-dev \
    zlib1g-dev \
    libzip-dev \
	&& docker-php-ext-configure gd --with-freetype --with-jpeg \
	&& docker-php-ext-install -j$(nproc) pdo pdo_mysql zip

EXPOSE 80