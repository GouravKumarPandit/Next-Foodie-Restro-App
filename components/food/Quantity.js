import { Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

function Quantity({ label = "", food_id, quantity = 1 }) {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <>
            <div className='relative z-20' >
                {
                    label && <p className="mb-2 mt-4 text-sm font-semibold text-gray-900">
                        {label} 
                        {/* - <span className='text-orange-600'>{quantity}</span> */}
                    </p>
                }

                <div className="flex w-fit items-center rounded-lg border border-gray-200">
                    <button
                        onClick={async (event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            if (quantity === 1) {
                                await removeFromCart(food_id);
                                return;
                            }

                            await updateQuantity(food_id, quantity - 1);
                        }}
                        type="button"
                        className="p-3 text-gray-500 transition hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                    >
                        <Minus size={16} />
                    </button>

                    <span className="min-w-10 text-center text-sm font-semibold text-gray-900">
                        {quantity}
                    </span>

                    <button
                        onClick={() => {
                            if (quantity >= 20) return;
                            updateQuantity(food_id, quantity + 1);
                        }}
                        type="button"
                        disabled={quantity >= 20}
                        className="p-3 text-gray-500 transition hover:bg-orange-50 hover:text-orange-600 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div> 
        </>
    )
}

export default Quantity;