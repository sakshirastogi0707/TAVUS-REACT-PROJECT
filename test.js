const _ = require('lodash')

function main() {
    const prev = [{id: 1, value: 'a'}, {id: 2, value: 'b'}, {id: 3, value: 'c'}]
    const current = [{id: 1, value: 'a'}, {id: 3, value: 'c'}]
    const diff = _.differenceWith(prev, current, _.isEqual)
    //console.log(diff)
}
//console.log(main())

