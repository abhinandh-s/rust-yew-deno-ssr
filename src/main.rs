use wasm_bindgen::prelude::*;
use yew::prelude::*;

#[function_component(App)]
fn app() -> Html {
    html! {
        <div>
            <h1>{"Hello from Yew SSR!"}</h1>
            <p style="color: blue;">{"This was rendered on Deno Deploy"}</p>
        </div>
    }
}

#[wasm_bindgen]
pub async fn render() -> String {
    let renderer = yew::ServerRenderer::<App>::new();
    renderer.render().await
}
