output "chatsite_url" {
  value = aws_s3_bucket_website_configuration.chat-site-bucket.website_endpoint
}