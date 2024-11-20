<x-main-layout>
	<x-slot:description>
	</x-slot:description>

	<x-slot:styles>
		<style>
		</style>
	</x-slot:styles>

	<div>
		@php
		// All published posts
		$posts = \Corcel\Model\Post::published()->get();
		$posts = \Corcel\Model\Post::status('publish')->get();

		// A specific post
		$posts = \Corcel\Model\Post::where('post_type', 'product')->latest()->take(100)->get();
		@endphp

		@foreach ($posts as $post)
		<div>
			<div>{{ $post->title }}</div>
		</div>
		@endforeach
	</div>

	<x-slot:scripts>
		<script>
		</script>
	</x-slot:scripts>
</x-main-layout>