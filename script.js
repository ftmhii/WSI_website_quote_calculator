document.addEventListener("DOMContentLoaded", () => {
    const currencySelect = document.getElementById("currency");
    const platformSelect = document.getElementById("platform");

    const wordpressOptions = document.getElementById("wordpress-options");
    const shopifyOptions = document.getElementById("shopify-options");
    const wixOptions = document.getElementById("wix-options");

    const pagesInput = document.getElementById("pages");
    const logoDesignCheckbox = document.getElementById("logo-design"); // Corrected ID
    const contentWritingCheckbox = document.getElementById("content-writing-checkbox");
    const contentWritingPagesInputGroup = document.getElementById("content-writing-pages-input");
    const contentPagesInput = document.getElementById("content-pages");
    const siteRecaptchaCheckbox = document.getElementById("site-recaptcha");
    const popupWindowCheckbox = document.getElementById("popup-window");
    const adaWidgetCheckbox = document.getElementById("ada-widget");
    const cadOnlyElements = document.querySelectorAll(".cad-only");

    const productsInput = document.getElementById("products");

    const calculateBtn = document.getElementById("calculate-btn");
    const priceDisplay = document.getElementById("price-display");

    const updateVisibility = () => {
        const selectedPlatform = platformSelect.value;
        const selectedCurrency = currencySelect.value;

        wordpressOptions.style.display = selectedPlatform === "wordpress" ? "block" : "none";
        shopifyOptions.style.display = selectedPlatform === "shopify" ? "block" : "none";
        wixOptions.style.display = selectedPlatform === "wix" ? "block" : "none";

        // Show/hide CAD-only options
        cadOnlyElements.forEach(el => {
            el.style.display = selectedCurrency === "cad" && selectedPlatform === "wordpress" ? "block" : "none";
        });

        // Show/hide content writing pages input
        contentWritingPagesInputGroup.style.display = contentWritingCheckbox.checked && selectedPlatform === "wordpress" ? "block" : "none";

        // Reset values when switching platforms/currency
        pagesInput.value = 1;
        productsInput.value = 0;
        contentPagesInput.value = 1; // Reset content pages
        logoDesignCheckbox.checked = false;
        contentWritingCheckbox.checked = false;
        siteRecaptchaCheckbox.checked = false;
        popupWindowCheckbox.checked = false;
        adaWidgetCheckbox.checked = false;
    };

    const calculatePrice = () => {
        let totalPrice = 0;
        const selectedPlatform = platformSelect.value;
        const selectedCurrency = currencySelect.value;

        if (selectedPlatform === "wordpress") {
            const numberOfPages = parseInt(pagesInput.value);
            if (isNaN(numberOfPages) || numberOfPages < 1) {
                alert("Please enter a valid number of pages (at least 1).");
                return;
            }

            if (selectedCurrency === "usd") {
                // WordPress USD Pricing
                if (numberOfPages <= 10) {
                    totalPrice = 350;
                } else {
                    totalPrice = 350 + (numberOfPages - 10) * 20;
                }
                if (logoDesignCheckbox.checked) totalPrice += 300;
                if (contentWritingCheckbox.checked) {
                    const numberOfContentPages = parseInt(contentPagesInput.value);
                    if (isNaN(numberOfContentPages) || numberOfContentPages < 1) {
                        alert("Please enter a valid number of content pages (at least 1).");
                        return;
                    }
                    totalPrice += numberOfContentPages * 60; // $60 per content page
                }
                if (siteRecaptchaCheckbox.checked) totalPrice += 40;
                if (popupWindowCheckbox.checked) totalPrice += 25;
            } else if (selectedCurrency === "cad") {
                // WordPress CAD Pricing
                if (numberOfPages <= 10) {
                    totalPrice = 440;
                } else {
                    totalPrice = 440 + (numberOfPages - 10) * 26;
                }
                if (logoDesignCheckbox.checked) totalPrice += 300; // Assuming same for CAD for now
                if (contentWritingCheckbox.checked) {
                    const numberOfContentPages = parseInt(contentPagesInput.value);
                    if (isNaN(numberOfContentPages) || numberOfContentPages < 1) {
                        alert("Please enter a valid number of content pages (at least 1).");
                        return;
                    }
                    totalPrice += numberOfContentPages * 80; // $80 per content page
                }
                if (popupWindowCheckbox.checked) totalPrice += 35;
                if (adaWidgetCheckbox.checked) totalPrice += 50;
                if (siteRecaptchaCheckbox.checked) totalPrice += 50;
            }
        } else if (selectedPlatform === "shopify") {
            const numberOfProducts = parseInt(productsInput.value);
            if (isNaN(numberOfProducts) || numberOfProducts < 0) {
                alert("Please enter a valid number of products (0 or more).");
                return;
            }
            // Shopify Pricing (example, adjust as needed)
            if (selectedCurrency === "usd") {
                totalPrice = 500 + (numberOfProducts * 1);
            } else if (selectedCurrency === "cad") {
                totalPrice = 650 + (numberOfProducts * 1.3);
            }
        } else if (selectedPlatform === "wix") {
            // Wix Pricing (example, adjust as needed)
            if (selectedCurrency === "usd") {
                totalPrice = 400; // Placeholder
            } else if (selectedCurrency === "cad") {
                totalPrice = 520; // Placeholder
            }
        }

        priceDisplay.textContent = `$${totalPrice}`;
    };

    currencySelect.addEventListener("change", updateVisibility);
    platformSelect.addEventListener("change", updateVisibility);
    contentWritingCheckbox.addEventListener("change", updateVisibility); // Listen for content writing checkbox change
    calculateBtn.addEventListener("click", calculatePrice);

    // Initial setup
    updateVisibility();
    calculatePrice();
});
