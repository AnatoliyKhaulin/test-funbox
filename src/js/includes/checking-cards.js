let catalogCardClassName = 'catalog-card__wrapper';
let $catalogCard = $(`.${catalogCardClassName}`);
let $catalogCardDisabled = $(`.${catalogCardClassName}--disabled`);
let $catalogCardBuyBtn = $('.catalog-card__buy-btn');

if ($catalogCard.length > 0) {
	$catalogCardDisabled.on('click', (event) => {
		event.preventDefault();
		event.stopPropagation();

		return false;
	});

	for (let index = 0; index < $catalogCardDisabled.length; index++) {
		$catalogCardDisabled.find(':checkbox').prop('disabled', true);
		let $checkboxDisabled = $catalogCardDisabled.find(':checkbox:disabled');
		let $catalogCardDisabledFooter = $checkboxDisabled.parent().siblings();
		let $checkboxDisabledData = $checkboxDisabled.data('disabled');

		$catalogCardDisabledFooter.html($checkboxDisabledData);
	}

	$catalogCard.on('click', (e) => {
		let $this = $(e.currentTarget);
		let $cardCheckbox = $this.find(':checkbox')[0];
		let $cardCheckboxData = $this.find('.catalog-card__checkbox');
		let $catalogCardFooter = $this.siblings('.catalog-card__footer');
		let $catalogCardBox = $this.find('.catalog-card__box');
		let $catalogCardDescription = $this.find('.catalog-card__description');

		if (e.target !== $cardCheckbox) {
			$cardCheckbox.checked = !$cardCheckbox.checked;
		}

		if ($cardCheckbox.checked && !$cardCheckbox.disabled === true) {
			let $dataSelected = $cardCheckboxData.data('selected');
			let $catalogCardFooterText = $catalogCardFooter.html();

			$cardCheckboxData.attr('data-default', $catalogCardFooterText);
			$catalogCardFooter.html($dataSelected);
			$this.removeClass(`${catalogCardClassName}--default`);
			$this.addClass(`${catalogCardClassName}--selected`);
		} else if (!$cardCheckbox.disabled === true) {
			let $dataDeafult = $cardCheckboxData.data('default');
			let $dataSelectedHovered = $cardCheckboxData.data('selected-hovered');

			$catalogCardFooter.html($dataDeafult);
			$this.removeClass(`${catalogCardClassName}--selected`);
			$catalogCardBox.removeClass('catalog-card__box--selected-hover');
			$this.addClass(`${catalogCardClassName}--default`);

			if ($dataSelectedHovered.length > 0) {
				$catalogCardDescription.html($dataSelectedHovered);
			}
		}
	});

	$catalogCard.on('mouseleave', (e) => {
		let $this = $(e.currentTarget);
		let $catalogCardBox = $this.find('.catalog-card__box');
		let $catalogCardDescription = $this.find('.catalog-card__description');
		let $cardCheckbox = $this.find('.catalog-card__checkbox');
		let $dataSelectedHovered = $cardCheckbox.attr('data-selected-hovered');

		if ($dataSelectedHovered.length > 0) {
			$catalogCardDescription.html($dataSelectedHovered);
		}

		if ($this.hasClass(`${catalogCardClassName}--selected`)) {
			$catalogCardBox.addClass('catalog-card__box--selected-hover');
		} else {
			$catalogCardBox.removeClass('catalog-card__box--selected-hover');
		}
	});

	$catalogCard.on('mouseenter', (e) => {
		let $this = $(e.currentTarget);
		let $catalogCardBox = $this.find('.catalog-card__box');
		let $catalogCardDescription = $this.find('.catalog-card__description');
		let $cardCheckbox = $this.find('.catalog-card__checkbox');

		if ($catalogCardBox.hasClass('catalog-card__box--selected-hover') && $this.hasClass(`${catalogCardClassName}--selected`)) {
			let $dataSelectedHover = $cardCheckbox.data('selected-hover');
			let $catalogCardDescriptionText = $catalogCardDescription.html();

			$cardCheckbox.attr('data-selected-hovered', $catalogCardDescriptionText);
			$catalogCardDescription.html($dataSelectedHover);
		}
	});

	$catalogCardBuyBtn.on('click', (e) => {
		let $this = $(e.currentTarget);
		let $catalogCardBox = $this.parent().siblings().find('.catalog-card__box');

		$catalogCardBox.addClass('catalog-card__box--selected-hover');
	});
}
