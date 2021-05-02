! function () {
    function t() {
        this.$lineItemsContainer = $(".js-line-items-container"), this.$subTotal = $("#SubTotal"), this.$tax = $("#Tax"), this.$total = $("#Total"), this.$taxRate = $("#TaxRate"), this.$taxLabel = $("#TaxLabel"), this.$taxInputContainer = $("#TaxInputContainer"), this.$taxButton = $("#EditTaxButton"), this.$form = $("#InvoiceGeneratorForm, .js-total-form"), this.$lineItemsContainer.on("change keyup", ".marketing-input", _.bind(this.render, this)), this.$taxRate.on("change keyup", _.bind(this.updateTaxRate, this)), this.$taxButton.on("click", _.bind(this.toggleTax, this)), this.initTax(), this.$form.on("submit", _.bind(this.submit, this)), this.$form.parsley({
            errorsWrapper: '<span class="marketing-form__messages"></span>',
            errorTemplate: '<span class="error"></span>'
        }), new GrowthTools.LineItem({
            removeCallback: _.bind(this.render, this)
        })
    }
    t.prototype.submit = function (t) {
        t.preventDefault(), this.$form.parsley().isValid() ? (this.setTaxValue(), this.$form.trigger(this.$form.data("eventTrigger")), ShopifyMarketing.Analytics.track("Invoice Generator", "Submit")) : ShopifyMarketing.Analytics.track("Invoice Generator", "Error")
    }, t.prototype.SELECTORS = {
        quantity: ".js-line-item-quantity",
        price: ".js-line-item-price",
        total: ".js-line-item-amount",
        itemRow: ".js-line-item"
    }, t.prototype.TAX_RATE = .18, t.prototype.render = function (t) {
        this.renderRowAmount(t), this.renderTotals()
    }, t.prototype.renderRowAmount = function (t) {
        var e = $(t.currentTarget).parents(this.SELECTORS.itemRow),
            i = e.find(this.SELECTORS.quantity).val(),
            a = e.find(this.SELECTORS.price).val(),
            n = this.cleanNumber(i * a),
            r = this.formatCurrency(n);
        e.find(this.SELECTORS.total).text(r).data("total", n)
    }, t.prototype.renderTotals = function () {
        var t = $(this.SELECTORS.total).map(function () {
            return $(this).data("total") || 0
        }),
            e = _.reduce(t, function (t, e) {
                return t + e
            }, 0),
            i = e * this.TAX_RATE,
            a = e + i;
        this.$subTotal.text(this.formatCurrency(e)), this.$tax.text(this.formatCurrency(i)), this.$total.text(this.formatCurrency(a))
    }, t.prototype.formatCurrency = function (t) {
        return "₹" + (Math.round(100 * t) / 100).toFixed(2)
    }, t.prototype.updateTaxRate = function (t) {
        var e = $(t.currentTarget).val(),
            i = this.cleanNumber(e.replace(/%/g, "") / 100);
        this.TAX_RATE = i, this.$taxLabel.text(this.formatTax(this.TAX_RATE)), this.renderTotals(), t.keyCode === ShopifyMarketing.keyCodes.ENTER && this.toggleTax()
    }, t.prototype.formatTax = function (t) {
        return Math.round(100 * t * 100) / 100 + "%"
    }, t.prototype.cleanNumber = function (t) {
        return _.isNaN(t) ? 0 : t
    }, t.prototype.toggleTax = function () {
        this.$taxInputContainer.prepareTransition().toggleClass("js-is-active"), this.$taxInputContainer.hasClass("js-is-active") ? (_.delay(_.bind(function () {
            this.$taxInputContainer.find(".marketing-input").focus()
        }, this), 300), this.$taxButton.find("span").text(I18n.t("invoice_toggle.close"))) : this.$taxButton.find("span").text(I18n.t("invoice_toggle.edit"))
    }, t.prototype.initTax = function () {
        var t = this.$taxRate.data("value");
        this.$taxRate.val(this.formatTax(t))
    }, t.prototype.setTaxValue = function () {
        var t = this.$taxRate.val();
        this.$taxRate.val(this.cleanNumber(t.replace(/%/g, "") / 100))
    }, $(function () {
        new t
    })
}();
