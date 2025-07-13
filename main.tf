resource "aws_s3_bucket" "chat-site-bucket" {
    bucket = "chat-site-bucket-7711771"
}

resource "aws_s3_bucket_public_access_block" "chat-site-bucket" {
    bucket = aws_s3_bucket.chat-site-bucket.id

    block_public_acls       = false
    block_public_policy     = false
    ignore_public_acls      = false
    restrict_public_buckets = false
}

resource "aws_s3_bucket_website_configuration" "chat-site-bucket" {
    bucket = aws_s3_bucket.chat-site-bucket.id

    index_document {
        suffix = "index.html"
    }

    error_document {
        key = "index.html"
    }
}

resource "aws_s3_bucket_policy" "public_read" {
    bucket = aws_s3_bucket.chat-site-bucket.id

    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [{
        Effect = "Allow"
        Principal = "*"
        Action = ["s3:GetObject"]
        Resource = ["${aws_s3_bucket.chat-site-bucket.arn}/*"]
        }]
    })

    depends_on = [aws_s3_bucket_public_access_block.chat-site-bucket]
}