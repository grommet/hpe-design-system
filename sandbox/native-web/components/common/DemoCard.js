export const DemoCard = ({ title, body, footer }) => `
    <div class="card">
        <h2>${title}</h2>
        <div class="card-body">${body}</div>
        <div class="card-footer">${footer}</div>
    </div>
`;
