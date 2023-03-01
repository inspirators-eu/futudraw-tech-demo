import {GENERATE_PDF_URL} from '$env/static/private';

export async function POST({request}: any) {
    const dxfRequest = await request.text();
    const resp = await fetch(GENERATE_PDF_URL, {
        method: 'POST',
        body: dxfRequest
    }).then(r => r.blob());

    return new Response(resp);
}
