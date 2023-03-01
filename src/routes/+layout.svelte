<script>
    import "../app.css";
</script>

<div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
    <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <nav class="flex items-center justify-between flex-wrap p-3">
            <div class="flex items-center flex-shrink-0 text-slate-600 mr-6">
                <img src="/logo.png" class="h-12">
                <span class="ml-2 font-semibold text-2xl tracking-tight">FutuDraw</span>
            </div>
        </nav>
        <div class="main-content flex flex-col flex-grow p-0">
            <div class="flex flex-col flex-grow bg-white rounded p-4 border-4 border-dotted">
                <slot/>
            </div>
        </div>
    </main>
</div>
