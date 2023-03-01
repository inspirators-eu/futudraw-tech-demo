<script lang="ts">

    export let dxf;
    export let name;

    async function exportPdf() {
        const response = await fetch('/api/pdf', {
            method: 'POST',
            body: dxf
        }).then(r => r.blob());

        const pdfUrl = URL.createObjectURL(response);
        download(
            name + '.pdf',
            pdfUrl
        )
    }

    function exportDxf() {
        download(
            name + '.dxf',
            'data:application/dxf;charset=utf-8,' + encodeURIComponent(dxf)
        );
    }

    function download(filename: string, content: string) {
        const element = document.createElement('a');
        element.style.display = 'none';
        element.setAttribute('href', content);
        element.setAttribute('download', filename);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
</script>

<button on:click={exportDxf} class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-5/12">DXF</button>
