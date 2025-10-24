import assert from "assert";

export const sample = {
    items: [
        {
            id: 'password-40db827550',
            fieldType: 'text-input',
            name: 'password',
            visible: true,
            required: false,
            enabled: true,
            readOnly: false,
            default: '123',
            label: {
                visible: true,
                value: 'Password',
            },
            ":type": "password",
        },
    ],
};


export function op(block) {
    const password = block.querySelector('input[type="password"]');
    password.value = '123';
    
    // Find the toggle password icon and click it
    const togglePasswordIcon = block.querySelector('#togglePassword');
    togglePasswordIcon.click();
}

export function expect(block) {
    // After clicking the toggle, the input type should be "text"
    const inputField = block.querySelector('input');
    assert.strictEqual(inputField.type, 'text', 'Input type should be changed to text after toggle');
    
    // The icon should have the eye icon (not eye-slash)
    const togglePasswordIcon = block.querySelector('#togglePassword');
    assert.ok(togglePasswordIcon.classList.contains('bi-eye'), 'Toggle icon should have bi-eye class');
    assert.ok(!togglePasswordIcon.classList.contains('bi-eye-slash'), 'Toggle icon should not have bi-eye-slash class');
    
    // Click again to toggle back
    togglePasswordIcon.click();
    
    // After clicking again, the input type should be "password"
    assert.strictEqual(inputField.type, 'password', 'Input type should be changed back to password after second toggle');
    
    // The icon should have the eye-slash icon
    assert.ok(!togglePasswordIcon.classList.contains('bi-eye'), 'Toggle icon should not have bi-eye class');
    assert.ok(togglePasswordIcon.classList.contains('bi-eye-slash'), 'Toggle icon should have bi-eye-slash class');
}
