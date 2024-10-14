export function update_sheet(_block) {
  const update_form = `<div class='update-content-wrapper'>
                            <h1>Update Sheet</h1>
                            <div class='select-container'>
                                <select>
                                    <option value="">one</option>
                                    <option value="">two</option>
                                    <option value="">three</option>
                                </select>
                            </div>
                            <div class='input-field'>
                                <input type="file" placeholder="Enter">
                            </div>
                            <button class='submit-btn'>Submit</button>    
                        </div>`;
  return update_form;
}

export default function decorate(block) {
  block.innerHTML = `${update_sheet(block)}`;
}
