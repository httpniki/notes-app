import { ReactNode } from "react";
import ReactDOM from 'react-dom'

export default function RenderModal({ children }: { children: ReactNode }) {
   return ReactDOM.createPortal(children, document.querySelector('body') as Element)
}
