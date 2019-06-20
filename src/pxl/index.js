
let target
let deps = new Map()

const Dep = () => {
	return {
		sub: [],
		depend(){
			if (target && !this.sub.includes(target)){
				this.sub.push(target)
			}
		},
		notify(){
			this.sub.forEach(s => s())
		}
	}
}

export const change = (el, cb) => el.addEventListener('change', el => cb(el.target.value))


export const bind = (f) => {
	target = f
	const res = f()
	f = null
	return f
}

export const render = (component, target) => {
	console.log(target, component())
	target.appendChild(component())
}

const Pxl = (state) => {
	const addDep = (key) => deps.set(key, Dep())

	Object.keys(state).forEach(addDep)

	let store = new Proxy(state, {
		get(o, key){
			deps.get(key).depend()
			return o[key]
		},
		set(o, key, v){
			if(!deps.has(key)) addDep(key)
			o[key] = v
			deps.get(key).notify()
			return true
		}
	})
	return store
}


export default Pxl