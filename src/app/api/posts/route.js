import { NextResponse } from 'next/server';
import connect from '@/utils/db';
import Post from '@/models/Post';

export const GET = async (request) => {
  const url = new URL(request.url);
  const username = url.searchParams.get('username');

  try {
    await connect();
    const posts = await Post.find(username && { username });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();

  const newPost = new Post(body);

  try {
    await connect();

    await newPost.save();

    return new NextResponse('Post has been created', { status: 201 });
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  console.log('Yessssssdsdasdkajsgdakdhsg kajshdgah');
  const { id } = params;
  try {
    await connect();

    const res = await Post.findByIdAndDelete(id);
    console.log(res + 'This is res');
    return new NextResponse('Post has been deleted', { status: 201 });
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 });
  }
};
