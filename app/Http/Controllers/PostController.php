<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{

    public function index(Request $request,$posts=null)
    {   
        //dd($posts);
        if(!$posts) $posts = Post::where("user_id", $request->user()->id)->orderBy("created_at", "asc")->paginate(10);
        $bd = Post::where("user_id", $request->user()->id)->select('title','content')->get(); //buscamos los valores de nuestras columnas
        $user = Auth::user();
        $user['roles'] = $user->getRoleNames();
        
        //dd($user);
        return Inertia::render('Posts/Index', [
            'posts' => $posts,
            'auth' => $user,
            'bd'=>$bd
        ]);
    }

    public function store(Request $request)
    {
        //dd($request->all());
        $dataValidate = $request->validate([
            'title' => 'required|string|max:255',
            'content' => ['required', 'string', 'max:10', 'lowercase'],
        ]);
        // $post=Post::create($dataValidate);
        $request->user()->posts()->create($dataValidate); // accedemos al modelo User y a su metodo posts()

        return redirect(route('posts.index'));

    }

    public function search(Request $request,string $title)
    {                   
        //dd($request,$title) ;      
        $posts = Post::where('title', 'like', "%$title%")
            ->orWhere('content', 'like', "%$title%")
            ->paginate(10);        
        $user = Auth::user();
        $user['roles'] = $user->getRoleNames();
        //return response()->json($posts);  
        return Inertia::render('Posts/Index', [
            'posts' => $posts,
            
            
        ]);
    }

    public function show(Request $request,Post $post)
    {   
        
    }


    public function update(Request $request, Post $post)
    {        
        $dataValidate = $request->validate([
            'title' => 'required|string|max:255',
            'content' => ['required', 'string', 'max:10', 'lowercase'],
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
