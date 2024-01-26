<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    
    public function index()
    {
        $posts = Post::latest()->paginate(10);
        
        return Inertia::render('Posts/Index',[
            'posts'=> $posts
        ]);       
    }
       
    public function store(Request $request)
    {   
        //dd($request->all());
        $dataValidate=$request->validate([ 
            'title'=> 'required|string|max:255',
            'content'=>['required','string','max:10','lowercase'],
        ]);
        // $post=Post::create($dataValidate);
        $request->user()->posts()->create($dataValidate); // accedemos al modelo User y a su metodo posts()

        return redirect(route('posts.index'));

    }

   
    public function show(Post $post)
    {
        
    }

     
    public function update(Request $request, Post $post)
    {   
        
        //dd($request->get('_valuesCache'),$post);
        //dd($post);
        
        //dd($request, $post);
        $dataValidate=$request->validate([ 
            'title'=> 'required|string|max:255',
            'content'=>['required','string','max:10','lowercase'],
        ]);
       
        $post->update($dataValidate);       
        return redirect(route('posts.index'));
    }

   
    public function destroy(Post $post)
    {
        $post->delete();
        return redirect(route('posts.index'));
    }
}
