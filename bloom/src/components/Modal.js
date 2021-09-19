export function Modal({ children, isVisible, setVisible }) {
	return isVisible ? <div
		style={{
			position: "absolute",
			height: "100vh",
			width: "100vw",
			top: "0px",
			left: "0px",
			backgroundColor: "#00000040",
			display: "grid",
			alignItems: "center",
			justifyContent: "center",
		}}
		onClick={() => setVisible(false)}>
		<div onClick={(e) => e.stopPropagation()}>
			{children}
		</div>
	</div > : null;
}