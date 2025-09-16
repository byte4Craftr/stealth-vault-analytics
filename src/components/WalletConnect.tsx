import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Wallet, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your session has been securely terminated.",
    });
  };

  return (
    <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/50 shadow-glass">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-accent/20">
          <Shield className="h-5 w-5 text-accent" />
        </div>
        <h3 className="text-lg font-semibold">Secure Wallet Connection</h3>
      </div>
      
      {!isConnected ? (
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Connect your wallet to sync your portfolio with zero-knowledge privacy protection.
          </p>
          
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated');

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <Button 
                          onClick={openConnectModal}
                          variant="stealth"
                          className="w-full"
                        >
                          <Wallet className="mr-2 h-4 w-4" />
                          Connect Wallet
                        </Button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <Button 
                          onClick={openChainModal}
                          variant="destructive"
                          className="w-full"
                        >
                          Wrong network
                        </Button>
                      );
                    }

                    return (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
                          <CheckCircle className="h-4 w-4 text-accent" />
                          <span className="text-sm font-medium">
                            Connected: {account.displayName}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-accent font-semibold">$247,892</div>
                            <div className="text-muted-foreground">Total Value</div>
                          </div>
                          <div className="text-center">
                            <div className="text-accent font-semibold">+12.4%</div>
                            <div className="text-muted-foreground">24h Change</div>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handleDisconnect}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          Disconnect
                        </Button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-3 w-3" />
            <span>Your keys never leave your device</span>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
            <CheckCircle className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">
              Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-accent font-semibold">$247,892</div>
              <div className="text-muted-foreground">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-accent font-semibold">+12.4%</div>
              <div className="text-muted-foreground">24h Change</div>
            </div>
          </div>
          
          <Button 
            onClick={handleDisconnect}
            variant="outline"
            size="sm"
            className="w-full"
          >
            Disconnect
          </Button>
        </div>
      )}
    </Card>
  );
};

export default WalletConnect;