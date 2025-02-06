import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/Authcontext";
import { useContext } from "react";
import CartService from "../service/cart.service";

const useCart = () => {
    const { user } = useContext(AuthContext);
    const {refetch, data: cart = []} = useQuery({
        queryKey:['carts', user?.email],
        queryFn: async () => {
            const response = await CartService.getCartItemByEmail(user?.email)
            return response.data;
        }
    });
    return {cart, refetch};
}

export default useCart;