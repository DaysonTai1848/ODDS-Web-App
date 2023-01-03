class VariationInput extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `


    <div class="add-product-property">
              <div class="add-product-label">Variation</div>
              <div class="add-product-input">
                <table>
                  <tr>
                    <th>Variation ID</th>
                    <th>Image</th>
                    <th>Variation Type</th>
                    <th>Price</th>
                    <th>Stock</th>
                  </tr>
                  <tr>
                    <td class="">001</td>
                    <td>
                      <div class="add-product-input-image-container">
                        <!--default html file upload button-->
                        <input type="file" id="actual-btn" hidden />
                        <!--our custom file upload button-->
                        <label class="add-product-input-image" for="actual-btn"
                          >Upload Image</label
                        >
                      </div>
                    </td>
                    <td>
                      <input type="text" placeholder="eg: colour, volume" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                </table>
              </div>
            </div>
    `;
  }
}

window.customElements.define("variation-input", VariationInput);
