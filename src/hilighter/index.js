/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback, useState } from '@wordpress/element';
import {
	registerFormatType,
	applyFormat,
	getActiveFormat,
} from '@wordpress/rich-text';
import {
	RichTextToolbarButton,
	RichTextShortcut,
} from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

/**
 * Internal dependencies
 */
// import { ReactComponent as IconSVG } from './icon.svg';
// import hex2rgba from '@vkblocks/utils/hex-to-rgba';
import { default as InlineColorUI } from './inline';

const name = 'highlighter';
export const defaultColor = '#fff';

// 色が指定されていなかったらデフォルトカラーを指定する
export const setColorIfUndefined = (color) => {
	if (color === undefined) {
		color = defaultColor;
	}
	return color;
};

//ハイライトカラーが選択されたら
export const highlighterOnApply = ({ color, value, onChange }) => {
	color = setColorIfUndefined(color);

	onChange(
		applyFormat(value, {
			type: name,
			attributes: {
				data: color,
				style: `background: ${color};`,
			},
		})
	);
};

function HighlighterEdit({
	value,
	onChange,
	isActive,
	activeAttributes,
	contentRef,
}) {
	const shortcutType = 'primary';
	const shortcutChar = 'h';

	let heightlightColor;
	if (isActive) {
		const activeFormat = getActiveFormat(value, name);
		heightlightColor = activeFormat.attributes.data;
	}
	let iconStyle = {};
	if (heightlightColor) {
		iconStyle = {
			color: 'initial',
			background: `${heightlightColor}`,
		};
	}

	const [isAddingColor, setIsAddingColor] = useState(false);

	const enableIsAddingColor = useCallback(
		() => setIsAddingColor(true),
		[setIsAddingColor]
	);
	const disableIsAddingColor = useCallback(
		() => setIsAddingColor(false),
		[setIsAddingColor]
	);

	return (
		<>
			<RichTextShortcut
				type={shortcutType}
				character={shortcutChar}
				onUse={() => setIsAddingColor(true)}
			/>
			<RichTextToolbarButton
				title={__('Highlighter')}
				onClick={() => {
					if (heightlightColor === undefined) {
						// set default color on initial
						highlighterOnApply({
							heightlightColor,
							value,
							onChange,
						});
					}
					setIsAddingColor(true);
					enableIsAddingColor(true);
				}}
				shortcutType={shortcutType}
				shortcutCharacter={shortcutChar}
				className="format-library-text-color-button"
				isActive={isActive}
        icon="editor-code"
				// icon={
				// 	<>
				// 		<Icon icon={IconSVG} style={iconStyle} />
				// 	</>
				// }
			/>
			{isAddingColor && (
				<InlineColorUI
					name={name}
					onClose={disableIsAddingColor}
					activeAttributes={activeAttributes}
					value={value}
					onChange={onChange}
					contentRef={contentRef}
					setIsAddingColor={setIsAddingColor}
				/>
			)}
		</>
	);
}

export const highlighColor = {
	title: __('Highlighter'),
	tagName: 'span',
	className: 'vk_highlighter',
	attributes: {
		data: 'data-color',
		style: 'style',
	},
	edit: HighlighterEdit,
};

registerFormatType(name, highlighColor);