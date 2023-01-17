import _ from 'lodash';

export class InputWithTagsHelper {

    static getTagBox(context) {
        const input = document.querySelector(`#tagify_${context.props.name}`);
        return input.previousSibling
    }

    static setEndOfContenteditable(contentEditableElement) {
        let range, selection;
        if (document.createRange) {
            range = document.createRange();
            range.selectNodeContents(contentEditableElement);
            range.collapse(false);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        } else if (document.selection) {
            range = document.body.createTextRange();
            range.moveToElementText(contentEditableElement);
            range.collapse(false);
            range.select();
        }
    }

    static focusTaggedInput(context) {
        const tagBox = InputWithTagsHelper.getTagBox(context)
        const toFocus = tagBox.querySelector(`.tagify__input`)
        toFocus.focus()
        InputWithTagsHelper.setEndOfContenteditable(toFocus)
    }

    static removeDropdownFromDOM(context) {
        const tagBox = InputWithTagsHelper.getTagBox(context)
        const dropdown = tagBox.querySelector('#tags__dropdown')
        if (dropdown) {
            tagBox.querySelectorAll('.variable-item').forEach(item => {
                if (item) {
                    item.removeEventListener('click', context.variableClick)
                }
            })

            const newVar = tagBox.querySelector('.new-variable')
            if (newVar) {
                newVar.removeEventListener('click', context.newVariableClick)
            }


            const inputNewVar = tagBox.querySelector('#input-new-variable')
            if (inputNewVar) inputNewVar.removeEventListener('input', context.handleVariableInput)

            const btnNewVar = tagBox.querySelector('#btn-new-variable')
            if (btnNewVar) btnNewVar.removeEventListener('click', context.handleAddNewVariableClick)

            dropdown.remove()
        }
    }

    static showNewVariableForm(context) {
        InputWithTagsHelper.removeDropdownFromDOM(context)
        const tagBox = InputWithTagsHelper.getTagBox(context)
        tagBox.insertAdjacentHTML('beforeend',
            `<div class="dropdown-wrapper" id="tags__dropdown">
                <h4 class="var-name">ENTER VARIABLE NAME</h4>
                <div class="var-input">
                    <input id="input-new-variable" placeholder="Enter the variable name" type="text" autofocus>
                    <input id="btn-new-variable" class="var-button" type="submit" value="Create">
                </div>
            </div>`
        );
        tagBox.querySelector('#input-new-variable').focus()

        tagBox.querySelector('#input-new-variable')
            .addEventListener('input', context.handleVariableInput)
        tagBox.querySelector('#btn-new-variable')
            .addEventListener('click', context.handleAddNewVariableClick)
    }

    static showDropdown(context, query) {
        InputWithTagsHelper.removeDropdownFromDOM(context)

        const tagBox = InputWithTagsHelper.getTagBox(context)
        let variables_html = ''
        const filtered_whitelist = context?.state?.variables?.filter(x => x?.value?.toLowerCase().includes(query))
        filtered_whitelist.forEach((item, index) => {
            const {color, colorIndex, value} = item
            variables_html += `<li class="variable-item" data-var-name="${value}" data-var-color-index="${colorIndex}"> 
                                    <span class="boxIcon align-self" style="background-color: ${color}"></span>
                                    <span class="tagBox">${value.replace('@', '')}</span>
                                </li>`
        })
        variables_html = variables_html ? `<h4>Variables</h2> <ul class="variable-list">${variables_html}</ul>` : ''

        let new_variable_html = ``
        if (query === '') {
            new_variable_html = `Create new variable`
        } else {
            new_variable_html = `Create variable "${query}"`
        }
        new_variable_html = `<h4 class="Creat-new-variable">CREATE VARIABLE</h4> <p data-var-name="${query}" data-var-color="#CF0289" class="new-variable">+ &nbsp; ${new_variable_html}</p>`
        tagBox.insertAdjacentHTML('beforeend',
            `<div class="dropdown-wrapper" id="tags__dropdown">
                        ${variables_html}
                        ${new_variable_html}
                    </div>`
        );
        tagBox.querySelectorAll('.variable-item').forEach(item => {
            item.addEventListener('click', context.variableClick)
        })
        tagBox.querySelector('.new-variable')
            .addEventListener('click', context.newVariableClick)
    }

    // static prefixWithSymbol() {
    //     document.querySelectorAll('.tagify__tag-text').forEach(element => {
    //         let text = element.innerText;
    //         if (!text.startsWith('@')) {
    //             element.innerText = '@' + text
    //         }
    //     })
    // }

    static getTagResultForAPI(context) {
        const tagBox = InputWithTagsHelper.getTagBox(context)
        const parent = tagBox.querySelector('span.tagify__input')
        const children = parent.childNodes
        let result = ''
        children.forEach((node) => {
            // console.log({node})
            if (node.nodeName === 'TAG') {
                let {instanceid, value, color} = InputWithTagsHelper.getVariableDetails(node)
                if (instanceid) {
                    result += ` @${value}|${instanceid}|${color}| `
                } else if (node.nodeName === '#text') {
                    result += node.data
                }
            } else if (node.nodeName === '#text') {
                result += node.data
            }
        })
        result = result.replace(/ +/g, ' ')
        return result
    }

    static cleanSpaces(context) {
        // const index = InputWithTagsHelper.getCaretIndex(context)
        const htmlStr = context.tagify_el.current.DOM.input.innerHTML
        // const c1 = htmlStr.match(/ {2,}/)
        // const c2 = htmlStr.match(/^ +/)
        // const c3 = htmlStr.match(/\n+/)
        // const c4 = htmlStr.match(/<br>/)
        // if (c1 || c2 || c3 || c4) {
        context.tagify_el.current.DOM.input.innerHTML = htmlStr
            .replace(/ {2,}/g, ' ')
            .replace(/^ +/g, '')
            .replace(/\n+/g, ' ')
            .replace(/<br>/g, '')

        InputWithTagsHelper.focusTaggedInput(context)
        // }
        // InputWithTagsHelper.setCaret(context, index)
    }

    static getVariableDetails(node) {
        let instanceid = node.attributes.instanceid.value
        let value = node.attributes.value.value
        let color = node.attributes.color.value
        return {instanceid, value: value.replace(/^@/, ''), color}
    }

    static parseTagResult(str) {
        let parts = str.split(' ')
        const variables = []
        parts = parts.map((part) => {
            if (part.includes('|')) {
                const parts2 = part.split('|')
                const colorIndex = InputWithTagsHelper.colors().indexOf(parts2[2])
                variables.push({value: parts2[0], instanceid: parts2[1], colorIndex})
                return `{{${parts2[0]}}}`
            }
            variables.push(part)
            return part
        }).join(' ')
        return {
            value: parts,
            variables
        }
    }

    static colors(index) {
        const colors = ['#F4BB28', '#18F2A4', '#1877F2', '#18BEF2', '#D561FF', '#FF67D4', '#FF6767', '#8567FF', '#C4FFA9']
        if (index === undefined) return colors

        const i = index % colors.length
        return {color: colors[i], colorIndex: i}
    }

    static getTextWithoutTagInfo(raw) {
        if (!raw) {
            return raw
        }
        return raw.replace(/\|\S+\|/g, '')
    }

    static createElementFromHTML(htmlString) {
        const div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    }

    static getDeletedTag(prevTags, currentTags) {
        const prevValues = []
        for (const prevTag of prevTags) {
            const values = InputWithTagsHelper.getVariableDetails(prevTag)
            prevValues.push(values)
        }

        const currentValues = []
        for (const currentTag of currentTags) {
            const values = InputWithTagsHelper.getVariableDetails(currentTag)
            currentValues.push(values)
        }

        return _.differenceWith(prevValues, currentValues, _.isEqual)
    }

    static getCaretIndex(context) {
        const element = context.tagify_el.current.DOM.input
        let position = 0;
        const isSupported = typeof window.getSelection !== "undefined";
        if (isSupported) {
            const selection = window.getSelection();
            if (selection.rangeCount !== 0) {
                const range = window.getSelection().getRangeAt(0);
                const preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                position = preCaretRange.toString().length;
            }
        }
        return position;
    }

    static setCaret(context, index) {
        var el = context.tagify_el.current.DOM.input
        var range = document.createRange()
        var sel = window.getSelection()

        if (el.childNodes[0]) {
            range.setStart(el.childNodes[0], index)
            range.collapse(true)

            sel.removeAllRanges()
            sel.addRange(range)
        }
    }

//    jasdkfj;as

    static createRange(node, chars, range) {
        if (!range) {
            range = document.createRange()
            range.selectNode(node);
            range.setStart(node, 0);
        }

        if (chars.count === 0) {
            range.setEnd(node, chars.count);
        } else if (node && chars.count > 0) {
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.textContent.length < chars.count) {
                    chars.count -= node.textContent.length;
                } else {
                    range.setEnd(node, chars.count);
                    chars.count = 0;
                }
            } else {
                for (var lp = 0; lp < node.childNodes.length; lp++) {
                    range = InputWithTagsHelper.createRange(node.childNodes[lp], chars, range);

                    if (chars.count === 0) {
                        break;
                    }
                }
            }
        }

        return range;
    }

    static setCurrentCursorPosition(chars, parentId) {
        if (chars >= 0) {
            var selection = window.getSelection();

            const range = InputWithTagsHelper.createRange(
                document.getElementById(parentId).parentNode,
                {count: chars}
            );

            if (range) {
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }

    static isChildOf(node, parentId) {
        while (node !== null) {
            if (node.id === parentId) {
                return true;
            }
            node = node.parentNode;
        }

        return false;
    };

    static getCurrentCursorPosition(parentId) {
        var selection = window.getSelection(),
            charCount = -1,
            node;

        if (selection.focusNode) {
            if (InputWithTagsHelper.isChildOf(selection.focusNode, parentId)) {
                node = selection.focusNode;
                charCount = selection.focusOffset;

                while (node) {
                    if (node.id === parentId) {
                        break;
                    }

                    if (node.previousSibling) {
                        node = node.previousSibling;
                        charCount += node.textContent.length;
                    } else {
                        node = node.parentNode;
                        if (node === null) {
                            break
                        }
                    }
                }
            }
        }

        return charCount;
    }
}

