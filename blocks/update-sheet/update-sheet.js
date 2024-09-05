export function update_sheet(_block) {
    let update_form = `<div class='container'>
                            <div class='select-container'>
                                <select name="" id="">
                                    <option value="">one</option>
                                    <option value="">two</option>
                                    <option value="">three</option>
                                </select>
                            </div>
                            <div class='input-field'>
                                <input type="text">
                            </div>
                            <button class='submit-btn'>submit</button>    
                        </div>`
    return update_form;
}

export default function decorate(block) {
    block.innerHTML = `${update_sheet(block)}`
}