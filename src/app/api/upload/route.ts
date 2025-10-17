import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
    }

    const uploadedFiles = []

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 })
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 })
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Generate unique filename
      const fileExtension = path.extname(file.name)
      const fileName = `${crypto.randomUUID()}${fileExtension}`
      const filePath = path.join(process.cwd(), 'public', 'images', 'tools', fileName)

      // Write file to public/images/tools/
      await writeFile(filePath, buffer)

      uploadedFiles.push({
        filename: fileName,
        url: `/images/tools/${fileName}`,
        originalName: file.name,
        size: file.size
      })
    }

    return NextResponse.json({
      success: true,
      files: uploadedFiles
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload files' },
      { status: 500 }
    )
  }
}