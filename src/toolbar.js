/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { InspectorControls,ColorPalette,RichTextToolbarButton } from '@wordpress/block-editor';
 
const smallText = ( { isActive, onChange, value } ) => {
    return (
        <RichTextToolbarButton
            icon="editor-code"
            title="Small text"
            onClick={ () => {
                onChange(
                    toggleFormat( value, {
                        type: 'text-style/small-text',
                    } )
                );
            } }
            isActive={ isActive }
        />
    );
};
const textDisplayIB = ( { isActive, onChange, value } ) => {
    return (
        <RichTextToolbarButton
            icon="editor-code"
            title="Inline Block Text"
            onClick={ () => {
                onChange(
                    toggleFormat( value, {
                        type: 'text-style/text-dib',
                    } )
                );
            } }
            isActive={ isActive }
        />
    );
};
const textR = ( { isActive, onChange, value } ) => {
    return (
        <RichTextToolbarButton
            icon="editor-code"
            title="Text Align Right"
            onClick={ () => {
                onChange(
                    toggleFormat( value, {
                        type: 'text-style/text-right',
                    } )
                );
            } }
            isActive={ isActive }
        />
    );
};
const underline = ( { isActive, onChange, value } ) => {
    return (
        <RichTextToolbarButton
            icon="editor-code"
            title="underline"
            onClick={ () => {
                onChange(
                    toggleFormat( value, {
                        type: 'text-style/underline',
                    } )
                );
            } }
            isActive={ isActive }
        />
    );
};
 
registerFormatType( 'text-style/small-text', {
    title: 'Small Text',
    tagName: 'small',
    className: 'small-text',
    edit: smallText,
} );
registerFormatType( 'text-style/text-dib', {
    title: 'Inline Block Text',
    tagName: 'span',
    className: 'text-dib',
    edit: textDisplayIB,
} );
registerFormatType( 'text-style/text-right', {
    title: 'Text Align Right',
    tagName: 'span',
    className: 'has-text-align-right',
    edit: textR,
} );
registerFormatType( 'text-style/underline', {
    title: 'underline',
    tagName: 'span',
    className: 'underline',
    edit: underline,
} );