class TicketMachine {
    public:
        void showPrompt();
        void getMoney();
        void printTicket();
        void showBalance();
        void printError();
    private:
        const int PRICE;
        int balance;
        int total;
}