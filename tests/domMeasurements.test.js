const domMeasurements = require('../dist/domMeasurements')

describe('testing domMeasurements', () => {
    let comp
    let secondParent

    const expectedBaseLine = {
        width: 100,
        height: 100,
        top: 200,
        right: 200,
        bottom: 300,
        left: 100
    }
    const expectedBaseLineSecondParent = {
        width: 100,
        height: 100,
        top: 100,
        right: 100,
        bottom: 200,
        left: 0
    }
    const expectedBaseLineWithBorder = {
        width: 100,
        height: 100,
        top: 205,
        right: 205,
        bottom: 305,
        left: 105
    }

    function addBorder(document, id) {
        document.getElementById(id).style.border = '5px solid #000'
    }

    function addChildrenAndReturnFirst(element) {
        element.innerHTML = `
                <div id="child" style="position: absolute; left: 100px; width: 10px; height: 10px;"></div>
                <div style="position: absolute; left: -10px; width: 10px; height: 10px;"></div>
            `
        return document.getElementById('child')
    }

    function addGrandchild(element) {
        element.innerHTML = '<div style="position: absolute; left: 10px; width: 10px; height: 10px;"></div>'
    }

    beforeEach(() => {
        comp = document.getElementById('component')
        secondParent = document.getElementById('second-parent')

        window.scrollTo(0, 1000)
    })
    describe('getElementRect', () => {
        it('should return a rect relative to document', () => {
            const measurements = domMeasurements.getElementRect(comp)
            expect(measurements).toEqual(expectedBaseLine)
        })

        it('should return a rect relative to document and offsetParent', () => {
            const measurements = domMeasurements.getElementRect(comp, secondParent)
            expect(measurements).toEqual(expectedBaseLineSecondParent)
        })

        it('should return a rect relative to document and consider borders', () => {
            addBorder(document, 'second-parent')

            const measurements = domMeasurements.getElementRect(comp)
            expect(measurements).toEqual(expectedBaseLineWithBorder)
        })
    })

    describe('getBoundingRect', () => {
        it('should return a rect relative to window', () => {
            const expected = {...expectedBaseLine, top: -800, bottom: -700}
            const measurements = domMeasurements.getBoundingRect(comp)
            expect(measurements).toEqual(expected)
        })

        it('should return a rect relative to window and offsetParent', () => {
            const expected = {...expectedBaseLineSecondParent, top: -900, bottom: -800}
            const measurements = domMeasurements.getBoundingRect(comp, secondParent)
            expect(measurements).toEqual(expected)
        })

        it('should return a rect relative to window and consider borders', () => {
            addBorder(document, 'second-parent')

            const expected = {...expectedBaseLineWithBorder, top: -795, bottom: -695}
            const measurements = domMeasurements.getBoundingRect(comp)
            expect(measurements).toEqual(expected)
        })

        it('should return a rect relative to scrollContainer', () => {
            const expected = {...expectedBaseLine}
            const measurements = domMeasurements.getBoundingRect(comp, null, secondParent)
            expect(measurements).toEqual(expected)
        })
    })

    describe('getContentRect', () => {
        let child

        beforeEach(() => {
            child = addChildrenAndReturnFirst(comp)
        })

        it('should return a rect of all contained children relative to document', () => {
            const expected = {...expectedBaseLine, left: 90, width: 120, right: 210}
            const measurements = domMeasurements.getContentRect(comp)
            expect(measurements).toEqual(expected)
        })

        it('should return a rect of all contained children relative to document and offsetParent', () => {
            const expected = {...expectedBaseLineSecondParent, left: -10, width: 120, right: 110}
            const measurements = domMeasurements.getContentRect(comp, secondParent)
            expect(measurements).toEqual(expected)
        })

        it('should return a rect of all contained children relative to document and consider borders', () => {
            addBorder(document, 'second-parent')

            const expected = {...expectedBaseLineWithBorder, left: 95, width: 120, right: 215}
            const measurements = domMeasurements.getContentRect(comp)
            expect(measurements).toEqual(expected)
        })

        it('should return a rect of all contained grandchildren relative to document', () => {
            addGrandchild(child)

            const expected = {...expectedBaseLine, left: 90, width: 130, right: 220}
            const measurements = domMeasurements.getContentRect(comp)
            expect(measurements).toEqual(expected)
        })

        it('should return a rect of all contained children and ignore grandchildren if child overflow !== visible relative to document', () => {
            addGrandchild(child)
            child.style.overflow = 'hidden'

            const expected = {...expectedBaseLine, left: 90, width: 120, right: 210}
            const measurements = domMeasurements.getContentRect(comp)
            expect(measurements).toEqual(expected)
        })
    })

    describe('getBoundingContentRect', () => {
        let child

        beforeEach(() => {
            child = addChildrenAndReturnFirst(comp)
        })

        it('should return a rect of all contained children relative to window', () => {
            const expected = {...expectedBaseLine, top: -800, bottom: -700, left: 90, width: 120, right: 210}
            const measurements = domMeasurements.getBoundingContentRect(comp)
            expect(measurements).toEqual(expected)
        })

        it('should return a rect of all contained children relative to window and offsetParent', () => {
            const expected = {...expectedBaseLineSecondParent, top: -900, bottom: -800, left: -10, width: 120, right: 110}
            const measurements = domMeasurements.getBoundingContentRect(comp, secondParent)
            expect(measurements).toEqual(expected)
        })

        it('should return a rect of all contained children relative to window and consider borders', () => {
            addBorder(document, 'second-parent')

            const expected = {...expectedBaseLineWithBorder, top: -795, bottom: -695, left: 95, width: 120, right: 215}
            const measurements = domMeasurements.getBoundingContentRect(comp)
            expect(measurements).toEqual(expected)
        })

        it('should return a rect of all contained grandchildren relative to window', () => {
            addGrandchild(child)

            const expected = {...expectedBaseLine, top: -800, bottom: -700, left: 90, width: 130, right: 220}
            const measurements = domMeasurements.getBoundingContentRect(comp)
            expect(measurements).toEqual(expected)
        })

        it('should return a rect of all contained children and ignore grandchildren if child overflow !== visible relative to window', () => {
            addGrandchild(child)
            child.style.overflow = 'hidden'

            const expected = {...expectedBaseLine, top: -800, bottom: -700, left: 90, width: 120, right: 210}
            const measurements = domMeasurements.getBoundingContentRect(comp)
            expect(measurements).toEqual(expected)
        })

        it('should return a rect of all contained children relative to scrollContainer', () => {
            const expected = {...expectedBaseLine, left: 90, width: 120, right: 210}
            const measurements = domMeasurements.getBoundingContentRect(comp, null, secondParent)
            expect(measurements).toEqual(expected)
        })
    })
})
