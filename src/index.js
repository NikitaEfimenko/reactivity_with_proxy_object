import Pxl, { bind, change, render, mount } from './pxl'

const state = {
	name: 'Nikita',
	surname: 'Efimenko',
}
const store = Pxl(state)


const target = document.getElementById('#root')

const Input = ({ text, onchange, children } ) => {	
	const component = document.createElement('input')
	component.type = 'text'

	text && bind(() => component.value = text)
	onchange && change(component, onchange)
	return mount(component, children)
}


const Container = ({ children = [] }) => {
	const component = document.createElement('div')
	return mount(component, children)
}


const App = Container({
	children: [
		Input({
			text:  store.name,
			onchange: v => store.name = v
		}),
		Container({
			children: [
				Input({
					text:  store.name,
					onchange: v => store.name = v
				}),
				Input({
					text:  store.name + store.surname
				})
			]
		})
	]
})


render(App,document.getElementById('#root'))
